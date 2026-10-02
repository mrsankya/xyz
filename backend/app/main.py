from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.config import get_settings
from app.business_routes import router as business_router
from app.database import SessionLocal
from app.crop_market_routes import router as crop_market_router
from app.kyc_routes import router as kyc_router
from app.routes import api, record_user_activity
from app.security import decode_access_token
from app.vehicle_routes import router as vehicle_availability_router


settings = get_settings()
app = FastAPI(title=settings.app_name, version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api)
app.include_router(vehicle_availability_router)
app.include_router(business_router)
app.include_router(crop_market_router)
app.include_router(kyc_router)


@app.middleware("http")
async def record_api_activity(request: Request, call_next):
    user_id = None
    token = request.cookies.get("access_token")
    if token:
        try:
            user_id = decode_access_token(token)
        except Exception:
            user_id = None

    try:
        response = await call_next(request)
    except Exception as exc:
        import traceback
        trace_str = traceback.format_exc()
        print("MIDDLEWARE CAUGHT EXCEPTION:", trace_str)
        return JSONResponse(
            status_code=500,
            content={"error": str(exc), "type": type(exc).__name__, "traceback": trace_str},
        )

    if request.url.path.startswith("/api/"):
        forwarded = request.headers.get("x-forwarded-for")
        ip_address = forwarded.split(",")[0].strip() if forwarded else request.client.host if request.client else None
        record_user_activity(
            user_id=user_id,
            action="API_REQUEST",
            route=request.url.path,
            method=request.method,
            status_code=response.status_code,
            details=f"{request.method} {request.url.path}",
            ip_address=ip_address,
            user_agent=request.headers.get("user-agent"),
        )
    return response


from fastapi.responses import JSONResponse
import traceback


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    print("UNHANDLED EXCEPTION:", exc)
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "type": type(exc).__name__, "traceback": traceback.format_exc()},
    )


@app.get("/health/live", tags=["health"])
def live() -> dict[str, str]:
    return {"status": "ok", "version": "1ccad10"}


@app.get("/health/ready", tags=["health"])
def ready() -> dict[str, str]:
    with SessionLocal() as db:
        db.execute(text("SELECT 1"))
    return {"status": "ready"}