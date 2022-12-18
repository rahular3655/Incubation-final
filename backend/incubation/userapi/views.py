from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# Create your views here.
from .serializers import MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .serializers import *
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
import json
from rest_framework import status

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer
    
    
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    
    
class newApplication(APIView):
    def post(self,request):
        newapplication=NewApplicationSearializer(data=request.data)
        if newapplication.is_valid():
            newapplication.save()
            return Response(status=200)
        else:
            data=newapplication.errors
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class existApplication(APIView):
    def get(self,request,id):  
        user = request.user      
        aa=ApplicationForm.objects.filter(user=id,status="Pending")
        if aa:
            print("AA is working right now response 200")
            return Response(status=200)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
    
        
        
class UserApplication(APIView):
    def post(self,request,id):
        allapplication=ApplicationForm.objects.filter(user=id)
        All=AllApplicationSerailizer(allapplication,many=True)
        if All :
            return Response(All.data,status=200)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class AllApplicaations(APIView):
    def get(self,request):
        allapplications=ApplicationForm.objects.all()
        print(allapplications)
        all=AllApplicationSerailizer(allapplications,many=True)
        if all:
            return Response(all.data,status=200)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class pendingApplication(APIView):
    def get (self,request):
        approved=ApplicationForm.objects.filter(status="Pending")
        print(approved)
        all=AllApplicationSerailizer(approved,many=True)
        if all:
            return Response(all.data,status=200)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        
class ApproveApplication(APIView):
    permission_classes = [IsAuthenticated]
    def get (self,request,id):
        all=ApplicationForm.objects.filter(id=id)
        all.update(status="Approved")
        return Response(200)

class listofaprvdapp(APIView):
    permission_classes = [IsAuthenticated]
    def get (self,request):
        approvelist =ApplicationForm.objects.filter(status="Approved")
        all=AllApplicationSerailizer(approvelist,many=True)
        if all:
            return Response(all.data,status=200)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class RejectApplication(APIView):
    
    def post(self,request,id):
        application = ApplicationForm.objects.filter(id=id)
        application.update(status="Declined")
        return Response(status=200)

class Listofrjtapp(APIView):
    def get(self,request):
        application=ApplicationForm.objects.filter(status="Declined")
        print(application,"kusyrygftrhloityjo6juo")
        all=AllApplicationSerailizer(application,many=True)
        if all:
            return Response(all.data,status=200)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class CreateSlot(APIView):
    def post(self,request):
        Slot.objects.create()
        return Response(200)
    
class Allslots(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        allslot=Slot.objects.all()
        all=SlotSerializer(allslot,many=True)
        if all:
            return Response(all.data,status=200)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class Alotslot(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        body=request.body.decode('utf-8')
        body = json.loads(body)
        print(body)
        slotid=body['slotid']
        applicationid=body['applicantid']
        app=ApplicationForm.objects.get(id=applicationid)
        app.alloted=True
        app.save()
        slot=Slot.objects.get(id=slotid)
        slot.reversed_by=app
        slot.is_available=False
        slot.save()
        return Response(status=200)

class ViewDetail(APIView):
    def get(self,request,id):
        details=ApplicationForm.objects.get(id=id)
        list=AllApplicationSerailizer(details,many =False)
        if list:
            return Response(list.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
        

