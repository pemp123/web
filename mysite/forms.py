from django import forms
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
  username= forms.CharField(label='username',max_length=100)
  email= forms.EmailField(label='email')
  #password= forms.CharField(label='password',max_length=100,widget=forms.PasswordInput())
  password = forms.CharField(label='Password', widget=forms.PasswordInput)

  class Meta:
    model = User
    fields = ('username', 'email')

class LoginForm(forms.Form):
  username_l = forms.CharField(label='username',max_length=100)
  password_l = forms.CharField(label='password',max_length=100,widget=forms.PasswordInput())

class Email_change(forms.Form):
  email= forms.EmailField(label='email')

class Phone(forms.Form):
  phone = forms.CharField(label='phone',max_length=100)