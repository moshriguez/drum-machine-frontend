# drum-machine-frontend

Models:
User -------------< Beat --< Beat-Pad >-- Pad
   |                |
   ---< Comments >---

User:
    Username
    Password_digest
    Bio
Beat:
    Name
    Description
    tempo
    User_id
Comment:
    User_id
    Beat_id
    Content
Pad:
    Name
    Sample_file
Beat-Pad:
    Beat_id
    Pad_id
    Sequence
    Volume

## User Stories:
Users will be able to:
[x] Create a new user
[x] Username will have uniqueness and length validations
    [x] Password will have a length requirement and require an upper case, a lower case and a number
    [x] Login as an existing user with username and password
[x] See a drum machine user interface with 4 different instruments and a 4 pad sequencer dividing one measure into 4 quarter notes in 4/4 time
[x] Press play to hear the drum loop
[x] Click on a button to select an individual drum
[x] Drum machine user interface will have an options section that will be reused for each drum
[x] Using the options section, users will be able to:
    [x] Change the pattern for each instrument
    [x] Change the volume for each instrument
    [x] Change the tempo for the drum loop
    [x] Play button becomes the stop button during playback and stops the loop when clicked
    [x] Click save to give the beat a name, description and persist the data to the DB
[x] Beat will have presence and uniqueness validation for a given user
[x] Each instrument will have its own save button to save the beat-pad
[x]  Comments on a beat
[x]  View all comments on a beat
[x] View their personal profile page
    [x] Contains bio
    [x] Saved beats and links to them
    [x] Feed with most recently saved beats and links to view beats
[x] Edit bio from personal profile page
[x] Delete account
[x] View another user’s page to view their bio, list of user’s beats and list of most recent comments the user made

## Stretch Goals:
[x] Add up to 10 instruments
[x] Add up to 16 pads to create one measure that is subdivided into 16th notes in 4/4 time
[] Ability to program beats longer than one measure
[] Ability to program beats in other time signatures
[] Add panning for each instrument
[] Add pitch for each instrument
[] User is warned before navigating away from an unsaved beat
[] Users can upload their own sample for each instrument
[] Add reverb or delay to each instrument
[] Users can follow other users
[] User’s profile will display a list of user’s followers and the users they follow
[] Users have an avatar or profile pic
[] User’s feed includes commenting activity
[] User’s feed includes following activity
[] Responsive to different screen sizes
[x] Change to one save button to save whole beat
[]  Add musical influences to User model/profile
