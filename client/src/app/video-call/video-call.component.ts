import { Component, OnInit } from '@angular/core';
import * as TwilioVideo from 'twilio-video';
import { TwilioService } from '../twilio.service';


@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  //token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2EzZjE4YWI5M2JlOGFmNGZkMzZkMjUzZjQ5YjE3ZTVjLTE1MjYzMDY5MTkiLCJpc3MiOiJTS2EzZjE4YWI5M2JlOGFmNGZkMzZkMjUzZjQ5YjE3ZTVjIiwic3ViIjoiQUM4ZDFiZWE0YWZiMDA1NWIzNjQ0Y2ZjZDUxNjFmMTBlZSIsImV4cCI6MTUyNjMxMDUxOSwiZ3JhbnRzIjp7ImlkZW50aXR5Ijoib2tvbW8tdmlkZW9jYWxsIiwidmlkZW8iOnt9fX0.oRQj5aSusO0QHIjCGMWi3k4EvggPE4CsPwGQslEZHuQ';
  token: TwilioToken;
  error: Error;
  room: TwilioVideo.Room;
  username: string;
  roomParticipants: string[] = [];

  constructor(private twilioService: TwilioService) { }

  ngOnInit() {
    //this.connectToRoom();
    TwilioVideo.createLocalVideoTrack().then(track => {
      var localMediaContainer = document.getElementById('local-media-div');
      localMediaContainer.appendChild(track.attach());
    });
  }

  connect(token: string) {
    TwilioVideo.connect(token, { name: 'okomo-test1', audio: true, video: { width: 640 }, type: 'peer-to-peer' }).then(room => {
      console.log('Connected to Room:', room);
      this.room = room;

      // Log your Client's LocalParticipant in the Room
      const localParticipant = room.localParticipant;
      console.log('Connected to the Room as LocalParticipant "%s"', localParticipant.identity);
      this.roomParticipants.push(localParticipant.identity);

      // Log any Participants already connected to the Room
      room.participants.forEach(participant => {
        console.log('Participant "%s" is connected to the Room', participant.identity);
        this.roomParticipants.push(participant.identity);
      });

      // Log new Participants as they connect to the Room
      room.once('participantConnected', participant => {
        console.log('Participant "%s" has connected to the Room', participant.identity);
        this.roomParticipants.push(participant.identity);
      });

      // Log Participants as they disconnect from the Room
      room.once('participantDisconnected', participant => {
        console.log('Participant "%s" has disconnected from Room', participant.identity);
      });
    }, error => {
      console.log(error);
      this.error = error;
    });

  }

  connectToRoom(username: string): void {
    this.twilioService.getToken(username)
      .subscribe(token => {
        this.token = token;
        console.log('Token: "%s"', token.token)
        this.connect(token.token);
      });
  }

  callParticipant(participantIdentity: string) {
    this.room.participants.forEach(participant => {
      if (participant.identity == participantIdentity) {
        let roomParticipant = participant;
        console.log(roomParticipant);
        let element = document.getElementById('remote-media-div');
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        }

        roomParticipant.tracks.forEach(track => {
          element.appendChild(track.attach());
        });

      }
    });

  }

}
