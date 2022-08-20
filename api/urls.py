from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    path('accounts/register/',views.RegisterUser),
    path('sessions/upcoming/',views.UpcomingSessions),
    path('sessions/today/',views.todaySessions),
    path('accounts/activation/<int:otp>',views.activation),
    path('accounts/login/',views.login),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]