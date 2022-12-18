from django.db import models 
from django.contrib.auth.models import User

# Create your models here.
class AllUserDetails(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    

class ApplicationForm (models.Model):
    STATUS=(
        ('Pending','Pending'),
        ('Declinded','Declined'),
        ('Approved','Approved'),
    )
    
    user= models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    date = models.DateField(auto_now_add=True,null=True)
    fullname=models.CharField(max_length=50,null=True)
    phone=models.IntegerField(null=True)
    company_name=models.CharField(max_length=150,null=True)
    email=models.EmailField(max_length=254,null=True)
    address=models.CharField(max_length=150,null=True)
    company_url = models.CharField(max_length=100,null=True)
    Typeofincubation = models.CharField(max_length=50,null=True)
    status= models.CharField(max_length=50,null=True,choices=STATUS,default="Pending")
    alloted=models.BooleanField(default=False)
    def __str__(self):
        return self.fullname
    
    
    
class Slot(models.Model):
    reversed_by = models.ForeignKey(ApplicationForm,on_delete=models.CASCADE,null=True)
    is_available=models.BooleanField(default=True)
    