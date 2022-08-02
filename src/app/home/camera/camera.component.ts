import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  @ViewChild("video")
  video!: ElementRef;
  streaming = false;
  private stream!: MediaStream;
  constructor() { }

  ngOnInit(): void {
  }
  initVideo(): void {
    this.getMediaStream()
      .then(stream => {
        this.stream = stream;
        this.streaming = true;
      })
      .catch(error => {
        this.streaming = false;
      })
  }

  private getMediaStream(): Promise<MediaStream> {
    const video_constraints = { video: true };
    const _video = this.video.nativeElement;

    return new Promise<MediaStream>((resolve, reject) => {
      return navigator.mediaDevices.getUserMedia(video_constraints)
        .then(stream => {
          (<any>window).stream = stream;
          _video.srcObject = stream;
          _video.onloadedmetadata = function (e: any) { };
          _video.play();
          return resolve(stream);
        }).catch(error => reject(error));
    })
  }
}
