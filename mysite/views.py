from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from .forms import UserForm
from .forms import LoginForm,Email_change
from .forms import Phone
from .models import Profile,Competition_pull2
from django.template import RequestContext
from collections import defaultdict
import weakref
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .consumers import Competition_pull, Competition_pull_snake, Competition_pull_2048


def one_time_startup():
  
  #Competition_pull = Competition_pull2.objects.create()
  print(Competition_pull)

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
  
def change_pass(request):
  return HttpResponse("ты папу мав")

def change_email(request):
  if request.method == 'POST':
    form = Email_change(request.POST)
    if form.is_valid():
      if request.headers.get('id') == 'ch_e-mail':
        form = Email_change(request.POST)
        if form.is_valid():
          if request.user.is_authenticated:
            #competition_pull = Competition_pull.objects.create()
            #competition_pull.members.add(request.user)
            request.user.email = form.cleaned_data['email']
            request.user.save()
  return HttpResponse(request.user.email)

def competitive(request):

  return render(request,'competitive.html')

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

def search(list, platform):
  for i in range(len(list)):
   if list[i].user_id == platform:
     return True
  return False


# def pool(request):
#   test_1 = Competition_pull2.objects.all()
#   Competition_pull.players[0]=""
#   for id in test_1:
#     id.members.add(request.user)
#     if 0 in Competition_pull.players:
#       tt = id.members.all()
#   return render(request,'pool.html',context={"profils": tt})

def tetris_pool(request):
  tt = 0;
  if((len(Competition_pull.players) < 2) or (request.user.id in Competition_pull.players)):
    Competition_pull.players[request.user.id] = ""
    if request.user.id in Competition_pull.players:
      tt = Competition_pull.players
    return render(request,'tetris_pool.html',context={"profils": tt.keys()})
  return render(request,'tetris_pool.html',context={"profils": tt})

def snake_pool(request):
  flag = 0
  print(len(Competition_pull_snake.players))
  print(Competition_pull_snake.players)
  if((len(Competition_pull_snake.players) < 2) or (request.user.id in Competition_pull_snake.players)):
    Competition_pull_snake.players[request.user.id] = ""
    flag=1
  return render(request,'snake_pool.html',context={"flag": flag})

def g2048_pool(request):
  flag = 0
  if((len(Competition_pull_2048.players) < 2) or (request.user.id in Competition_pull_2048.players)):
    Competition_pull_2048.players[request.user.id] = ""
    flag=1
  return render(request,'g2048_pool.html',context={"flag": flag})

# def test(request):
#   Competition_pull_snake.players.clear()
#   print(len(Competition_pull_snake.players))
#   return HttpResponse(0)
  # temp = 1
  # Competition_pull.players[request.user.id] = request.body
  # player_finder = Competition_pull.players.keys()
  # for i in player_finder:
  #   if(request.user.id != i):
  #     temp = Competition_pull.players[i]
  # return HttpResponse(temp)
  

