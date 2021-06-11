import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
import threading

class Pool:
  # players
  def __init__(self):
    self.players={}

Competition_pull = Pool()
Competition_pull_snake = Pool()
Competition_pull_2048 = Pool()

class game_2048(AsyncJsonWebsocketConsumer):
  async def connect(self):
      self.room_name = self.scope['user'].id
      self.room_group_name = 'room_%s' % self.room_name

      # Join room group
      await self.channel_layer.group_add(
          self.room_group_name,
          self.channel_name
      )
      await self.accept()

  async def disconnect(self, close_code):
      print("Disconnected")
      # Leave room group
      await self.channel_layer.group_discard(
          self.room_group_name,
          self.channel_name
      )
      Competition_pull_2048.players.pop(self.scope['user'].id)

  async def receive(self, text_data):
      """
      Receive message from WebSocket.
      Get the event and send the appropriate event
      """
      response = json.loads(text_data)
      event = response.get("event", None)
      message = response.get("message", None)
      if event == 'move':
          # Send message to room group
          temp = 1
          Competition_pull_2048.players[self.scope['user'].id] = message
          player_finder = Competition_pull_2048.players.keys()
          for i in player_finder:
            if(self.scope['user'].id != i):
              temp = Competition_pull_2048.players[i]
          await self.channel_layer.group_send(self.room_group_name, {
              'type': 'send_message',
              'message': temp,
              "event": "move"
          })

      if event == 'START':
          print("start")
          # Send message to room group
          await self.channel_layer.group_send(self.room_group_name, {
              'type': 'send_message',
              'message': message,
              'event': "START"
          })

      if event == 'END':
          # Send message to room group
          print("end")
          await self.channel_layer.group_send(self.room_group_name, {
              'type': 'send_message',
              'message': message,
              'event': "END"
          })

  async def send_message(self, res):
      """ Receive message from room group """
      # Send message to WebSocket
      await self.send(text_data=json.dumps({
          "payload": res,
      }))

class snake(AsyncJsonWebsocketConsumer):
  async def connect(self):
      self.room_name = self.scope['user'].id
      self.room_group_name = 'room_%s' % self.room_name

      # Join room group
      await self.channel_layer.group_add(
          self.room_group_name,
          self.channel_name
      )
      await self.accept()

  async def disconnect(self, close_code):
      print("Disconnected")
      # Leave room group
      await self.channel_layer.group_discard(
          self.room_group_name,
          self.channel_name
      )
      Competition_pull_snake.players.pop(self.scope['user'].id)

  async def receive(self, text_data):
      """
      Receive message from WebSocket.
      Get the event and send the appropriate event
      """
      response = json.loads(text_data)
      event = response.get("event", None)
      message = response.get("message", None)
      if event == 'move':
          # Send message to room group
          temp = 1
          Competition_pull_snake.players[self.scope['user'].id] = message
          player_finder = Competition_pull_snake.players.keys()
          for i in player_finder:
            if(self.scope['user'].id != i):
              temp = Competition_pull_snake.players[i]
          await self.channel_layer.group_send(self.room_group_name, {
              'type': 'send_message',
              'message': temp,
              "event": "move"
          })

      if event == 'START':
          print("start")
          # Send message to room group
          await self.channel_layer.group_send(self.room_group_name, {
              'type': 'send_message',
              'message': message,
              'event': "START"
          })

      if event == 'END':
          # Send message to room group
          print("end")
          await self.channel_layer.group_send(self.room_group_name, {
              'type': 'send_message',
              'message': message,
              'event': "END"
          })

  async def send_message(self, res):
      """ Receive message from room group """
      # Send message to WebSocket
      await self.send(text_data=json.dumps({
          "payload": res,
      }))

class mysite(AsyncJsonWebsocketConsumer):
    async def connect(self):
        # self.room_name = self.scope['url_route']['kwargs']['room_code']
        self.room_name = self.scope['user'].id
        self.room_group_name = 'room_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print("Disconnected")
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        Competition_pull.players.pop(self.scope['user'].id)

    async def receive(self, text_data):
        """
        Receive message from WebSocket.
        Get the event and send the appropriate event
        """
        response = json.loads(text_data)
        event = response.get("event", None)
        message = response.get("message", None)
        if event == 'move':
            # Send message to room group
            temp = 1
            Competition_pull.players[self.scope['user'].id] = message
            player_finder = Competition_pull.players.keys()
            for i in player_finder:
              if(self.scope['user'].id != i):
                temp = Competition_pull.players[i]
            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'send_message',
                'message': temp,
                "event": "move"
            })

        if event == 'START':
            print("start")
            # Send message to room group
            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'send_message',
                'message': message,
                'event': "START"
            })

        if event == 'END':
            # Send message to room group
            print("end")
            await self.channel_layer.group_send(self.room_group_name, {
                'type': 'send_message',
                'message': message,
                'event': "END"
            })

    async def send_message(self, res):
        """ Receive message from room group """
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            "payload": res,
        }))