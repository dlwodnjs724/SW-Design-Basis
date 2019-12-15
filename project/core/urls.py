from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from core import views

app_name = 'core'

urlpatterns = [
    path('', views.main, name="main"),
    path('api/score/', views.ScoreAPIView.as_view()),
    path('score/', views.score_create)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
