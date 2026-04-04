export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'wildlife' | 'photo' | 'explore' | 'challenge';
  completed: boolean;
}

export const MISSIONS: Mission[] = [
  { id: '0',  title: 'Wildlife Trio',     description: 'Capture 3 different animals at one waterfall.',          category: 'wildlife',   completed: false },
  { id: '1',  title: 'Flying Moment',     description: 'Take a photo of a bird in motion.',                      category: 'photo',      completed: false },
  { id: '2',  title: 'Tiny World',        description: 'Photograph an insect up close.',                         category: 'photo',      completed: false },
  { id: '3',  title: 'Mirror Shot',       description: 'Capture a reflection in the water.',                     category: 'photo',      completed: false },
  { id: '4',  title: 'Near the Falls',    description: 'Take a photo of wildlife near a waterfall.',             category: 'wildlife',   completed: false },
  { id: '5',  title: 'Macro Hunter',      description: 'Photograph something small and detailed.',               category: 'photo',      completed: false },
  { id: '6',  title: 'Silent Approach',   description: "Capture an animal without scaring it away.",             category: 'wildlife',   completed: false },
  { id: '7',  title: 'Golden Light',      description: 'Take a photo during golden hour.',                       category: 'photo',      completed: false },
  { id: '8',  title: 'Water Motion',      description: 'Photograph water drops in motion.',                      category: 'photo',      completed: false },
  { id: '9',  title: 'Shadow Shape',      description: 'Capture a silhouette of an animal.',                     category: 'photo',      completed: false },
  { id: '10', title: 'Double Visit',      description: 'Visit 2 different waterfalls in one day.',               category: 'explore',    completed: false },
  { id: '11', title: 'Hidden Path',       description: "Explore a less obvious trail near a waterfall.",         category: 'explore',    completed: false },
  { id: '12', title: 'Quiet Escape',      description: 'Find a peaceful spot away from crowds.',                 category: 'explore',    completed: false },
  { id: '13', title: 'New Route',         description: "Walk a path you've never taken before.",                 category: 'explore',    completed: false },
  { id: '14', title: 'Still Observer',    description: 'Spend 10 minutes observing nature without moving.',      category: 'challenge',  completed: false },
  { id: '15', title: 'Bird Watcher',      description: 'Spot 3 different bird species.',                        category: 'wildlife',   completed: false },
  { id: '16', title: 'Insect Finder',     description: 'Find and photograph an insect.',                        category: 'wildlife',   completed: false },
  { id: '17', title: 'Water Life',        description: 'Capture an animal near water.',                         category: 'wildlife',   completed: false },
  { id: '18', title: 'Patient Watch',     description: 'Observe wildlife for at least 5 minutes.',              category: 'wildlife',   completed: false },
  { id: '19', title: 'First Encounter',   description: 'Record your first wildlife sighting.',                  category: 'wildlife',   completed: false },
  { id: '20', title: 'Triple Mission',    description: 'Complete 3 tasks in one trip.',                         category: 'challenge',  completed: false },
  { id: '21', title: 'Smart Choice',      description: 'Visit a waterfall recommended by the quiz.',            category: 'challenge',  completed: false },
  { id: '22', title: 'Early Explorer',    description: 'Capture wildlife at sunrise.',                          category: 'challenge',  completed: false },
  { id: '23', title: 'No Zoom Challenge', description: 'Take photos without using zoom.',                       category: 'challenge',  completed: false },
  { id: '24', title: 'Disconnect Mode',   description: "Finish a mission without checking your phone.",         category: 'challenge',  completed: false },
  { id: '25', title: 'Rainbow Catcher',   description: 'Capture a rainbow near a waterfall.',                   category: 'photo',      completed: false },
  { id: '26', title: 'Cloudy Mood',       description: 'Visit a waterfall in cloudy weather.',                  category: 'explore',    completed: false },
  { id: '27', title: 'Into the Mist',     description: 'Take a photo in mist conditions.',                      category: 'photo',      completed: false },
  { id: '28', title: 'Sound of Nature',   description: 'Record the sound of a waterfall.',                      category: 'challenge',  completed: false },
  { id: '29', title: 'Story Shot',        description: 'Take a photo that tells a story.',                      category: 'photo',      completed: false },
];