from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .forms import UserForm
from .forms import LoginForm,Email_change
from .forms import Phone
from .models import Profile

def index(request):
  return render(request,'index.html')

# def page_login(request):
#   return render(request,'login.html')

def exit(request):
  logout(request)
  return render(request,'index.html')

@csrf_exempt 
def register(request):
  if request.method == 'POST':
    form = UserForm(request.POST)
    if form.is_valid():
      new_user = form.save(commit=False)
       # Set the chosen password
      new_user.set_password(form.cleaned_data['password'])
      # Save the User object
      new_user.save()
  else:
    form = UserForm()
  return render(request, 'register.html', {'form': form})

@csrf_exempt 
def user_login(request):
  if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(username=cd.get("username_l"), password=cd.get("password_l"))
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return render(request,'index.html')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid login')
  else:
    form = LoginForm()
  return render(request, 'login.html', {'form': form})

def startPattern(request):
  return render(request,'startPattern.html')
  
def exitPattern(request):
 return render(request,'exitPattern.html')

@csrf_exempt
def profile(request):
  if request.method == 'POST':
    if request.POST.get('ch_e-mail'):
      form = Email_change(request.POST)
      if form.is_valid():
        if request.user.is_authenticated:
          request.user.email = form.cleaned_data['email']
          request.user.save()
  form = UserForm()
  return render(request,'profile.html', {'form': form})
  #   if request.POST.get('add'):
  #     form = Phone(request.POST)
  #     if form.is_valid():
  #       if request.user.is_authenticated:
  #         request.user.profile.phone = form.cleaned_data['phone']
  #         request.user.profile.save()
  #   elif request.POST.get('delete'):
  #     request.user.profile.phone = None
  #     request.user.profile.save()
  # form = Phone()
  # return render(request,'profile.html', {'form': form})
  
# def change_pass(request):
#   if request.method == 'POST':
#     return HttpResponse("ты")
#   return HttpResponse("ты папу мав")

def change_email(request):
  return HttpResponse("ты папу мав")

def page_2048(request):
  return render(request,'gamepages/page_2048.html')

def page_tetris(request):
  return render(request,'gamepages/page_tetris.html')

def page_snake(request):
  return render(request,'gamepages/page_snake.html')

def page_dinojumps(request):
  return render(request,'gamepages/page_dinojumps.html')

def page_pingpong(request):
  return render(request,'gamepages/page_pingpong.html')

def page_racing(request):
  return render(request,'gamepages/page_racing.html')

def page_shooter(request):
  return render(request,'gamepages/page_shooter.html')

def g2048(request):
  return render(request,'gamepages/games/g2048.html')

def tetris(request):
  return render(request,'gamepages/games/tetris.html')

def snake(request):
  return render(request,'gamepages/games/snake.html')

def dinojumps(request):
  return render(request,'gamepages/games/dinojumps.html')

def pingpong(request):
  return render(request,'gamepages/games/pingpong.html')

def racing(request):
  return render(request,'gamepages/games/racing.html')

def shooter(request):
  return render(request,'gamepages/games/shooter.html')

def rating(request):
  return render(request,'rating.html')