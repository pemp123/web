"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('index', views.index, name='index'),
    path('login.html',views.user_login, name='user_login'),  
    path('accounts/', include('django.contrib.auth.urls')),  
    path('register.html',views.register, name='register'), 
    path('startPattern.html',views.startPattern, name='startPattern'),
    path('exitPattern.html',views.exitPattern, name='exitPattern'),
    path('profile.html',views.profile, name='profile'),
    path('exit', views.exit, name="exit"),
    path('page-2048',views.page_2048, name='page-2048'),
    path('page-tetris',views.page_tetris, name='page-tetris'),
    path('page-snake',views.page_snake, name='page-snake'),
    path('page-pingpong',views.page_pingpong, name='page-pingpong'),
    path('page-shooter',views.page_shooter, name='page-shooter'),
    path('page-dinojumps',views.page_dinojumps, name='page-dinojumps'),
    path('page-racing',views.page_racing, name='page-racing'),
    path('2048',views.g2048, name='2048'),
    path('tetris',views.tetris, name='tetris'),
    path('snake',views.snake, name='snake'),
    path('pingpong',views.pingpong, name='pingpong'),
    path('shooter',views.shooter, name='shooter'),
    path('dinojumps',views.dinojumps, name='dinojumps'),
    path('racing',views.racing, name='racing'),
    path('rating',views.rating, name='rating'),
    #path('change_pass',views.change_pass, name='change_pass'),
    path('change_email',views.change_email, name='change_email'),
    path('competitive',views.competitive, name='competitive'),
    path('tetris_pool',views.tetris_pool, name='tetris_pool'),
    path('snake_pool',views.snake_pool, name='snake_pool'),
    path('g2048_pool',views.g2048_pool, name='g2048_pool'),
    #path('test',views.test, name='test'),
]

views.one_time_startup()