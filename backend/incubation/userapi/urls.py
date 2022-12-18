from django.urls import path
from userapi.views import *
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('newapplication/', newApplication.as_view(), name='newapplication'),
    path('existapplication/<int:id>/', existApplication.as_view(), name='existapplication'),
    
    path('applications/', AllApplicaations.as_view(), name='applications'),
    path('pending/', pendingApplication.as_view(), name='pending'),
    path('approved/', listofaprvdapp.as_view(), name='approved'),
    path('rejected/', Listofrjtapp.as_view(), name='rejected'),
    path('userapplication/<int:id>/', UserApplication.as_view(), name='userapplication'),
    path('approve/<int:id>/', ApproveApplication.as_view(), name='approve'),
    path('reject/<int:id>/', RejectApplication.as_view(), name='reject'),
    path('createslot/', CreateSlot.as_view(), name='createslot'),
    path('allslot/', Allslots.as_view(), name='allslot'),
    path('allotslot/', Alotslot.as_view(), name='alotslot'),
    path('viewdetail/<int:id>',views.ViewDetail.as_view(),name="viewdetail"),
    
]