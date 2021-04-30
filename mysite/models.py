from django.db import models
from django.contrib.auth.models import User

# Register your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=255, blank=True, null=True, verbose_name='phone')
    description = models.TextField(blank=True, verbose_name='descripction')

    class Meta:
        ordering = ['user']
        verbose_name = 'user'
        verbose_name_plural = 'users'
    
    def check_phone(self):
      if(self.phone == None):
        return False
      else:
         return True
    
    def set_phone(self):
      self.phone = "1111"