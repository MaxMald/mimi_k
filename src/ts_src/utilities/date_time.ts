import { AssertNumber } from "./asserts";

export function GetHHMMSS(_seconds : number)
: string
{
  AssertNumber(_seconds);
  _seconds = Math.floor(_seconds);
  
  let hours : number = Math.floor(_seconds / 3600);
  let minutes : number = Math.floor((_seconds - (hours * 3600)) / 60);
  let seconds : number = _seconds - (hours * 3600) - (minutes * 60);

  let time = ""
  
  // Hours
  if (hours < 10) {
    time += "0" + hours;
  }
  else {
    time += hours;
  }
  time += ' : ';

  // Minutes
  if (minutes < 10) {
    time += "0" + minutes;
  }
  else {
    time += minutes;
  }
  time += ' : ';

  // Seconds
  if (seconds < 10) {
    time += "0" + seconds;
  }
  else {
    time += seconds;
  }
  return time;
}

export function GetMMSS(_seconds : number)
: string
{
  AssertNumber(_seconds);
  _seconds = Math.floor(_seconds);
  
  let hours : number = Math.floor(_seconds / 3600);
  let minutes : number = Math.floor((_seconds - (hours * 3600)) / 60);
  let seconds : number = _seconds - (hours * 3600) - (minutes * 60);

  let time = ""

  // Minutes
  if (minutes < 10) {
    time += "0" + minutes;
  }
  else {
    time += minutes;
  }
  time += ' : ';

  // Seconds
  if (seconds < 10) {
    time += "0" + seconds;
  }
  else {
    time += seconds;
  }
  return time;
}