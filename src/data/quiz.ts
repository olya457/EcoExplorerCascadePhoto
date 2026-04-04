export type QuizTag = 'accessible' | 'easy' | 'mountain' | 'wild' | 'adventure';

export interface QuizOption {
  label: string;
  tag: QuizTag;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: '1',  question: 'What type of trip do you prefer?',    options: [{ label: 'Relaxing sightseeing', tag: 'easy' }, { label: 'Exploring hidden places', tag: 'wild' }, { label: 'Scenic mountain views', tag: 'mountain' }, { label: 'Quick and easy trips', tag: 'accessible' }] },
  { id: '2',  question: 'How far are you willing to travel?',  options: [{ label: 'Not far', tag: 'accessible' }, { label: 'A few hours', tag: 'easy' }, { label: 'Long road trip', tag: 'mountain' }, { label: 'Remote journey', tag: 'wild' }] },
  { id: '3',  question: 'What excites you most?',              options: [{ label: 'Famous places', tag: 'easy' }, { label: 'Discovering new spots', tag: 'wild' }, { label: 'Epic landscapes', tag: 'mountain' }, { label: 'Easy walks', tag: 'accessible' }] },
  { id: '4',  question: 'How active are you?',                 options: [{ label: 'Very active', tag: 'adventure' }, { label: 'Moderately active', tag: 'mountain' }, { label: 'Chill', tag: 'easy' }, { label: 'Minimal effort', tag: 'accessible' }] },
  { id: '5',  question: 'Do you like crowds?',                 options: [{ label: 'Yes', tag: 'easy' }, { label: "It's okay", tag: 'accessible' }, { label: 'Prefer fewer people', tag: 'mountain' }, { label: 'Avoid completely', tag: 'wild' }] },
  { id: '6',  question: 'Preferred terrain?',                  options: [{ label: 'Easy paths', tag: 'accessible' }, { label: 'Forest trails', tag: 'mountain' }, { label: 'Mountains', tag: 'adventure' }, { label: 'Wild terrain', tag: 'wild' }] },
  { id: '7',  question: 'Your ideal photo?',                   options: [{ label: 'Iconic landmark', tag: 'easy' }, { label: 'Rare wildlife', tag: 'wild' }, { label: 'Mountains', tag: 'mountain' }, { label: 'Close details', tag: 'accessible' }] },
  { id: '8',  question: 'How much planning do you like?',      options: [{ label: 'None', tag: 'accessible' }, { label: 'Some', tag: 'easy' }, { label: 'Detailed', tag: 'adventure' }, { label: 'Full expedition', tag: 'wild' }] },
  { id: '9',  question: 'Favorite activity?',                  options: [{ label: 'Taking photos', tag: 'easy' }, { label: 'Hiking', tag: 'adventure' }, { label: 'Exploring', tag: 'wild' }, { label: 'Relaxing', tag: 'accessible' }] },
  { id: '10', question: 'How important is comfort?',           options: [{ label: 'Very', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'Low', tag: 'mountain' }, { label: 'Not important', tag: 'wild' }] },
  { id: '11', question: 'Do you like cold weather?',           options: [{ label: 'No', tag: 'accessible' }, { label: 'Neutral', tag: 'easy' }, { label: 'Yes', tag: 'mountain' }, { label: 'Love it', tag: 'wild' }] },
  { id: '12', question: 'Travel style?',                       options: [{ label: 'Family', tag: 'easy' }, { label: 'Couple', tag: 'accessible' }, { label: 'Friends', tag: 'adventure' }, { label: 'Solo', tag: 'wild' }] },
  { id: '13', question: 'What matters most?',                  options: [{ label: 'Comfort', tag: 'accessible' }, { label: 'Views', tag: 'mountain' }, { label: 'Experience', tag: 'adventure' }, { label: 'Discovery', tag: 'wild' }] },
  { id: '14', question: 'Trip length?',                        options: [{ label: 'One day', tag: 'accessible' }, { label: 'Weekend', tag: 'easy' }, { label: 'Few days', tag: 'mountain' }, { label: 'Long trip', tag: 'wild' }] },
  { id: '15', question: 'Risk level?',                         options: [{ label: 'Low', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'High', tag: 'adventure' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '16', question: 'Navigation skills?',                  options: [{ label: 'Beginner', tag: 'accessible' }, { label: 'Average', tag: 'easy' }, { label: 'Good', tag: 'mountain' }, { label: 'Expert', tag: 'wild' }] },
  { id: '17', question: 'Do you enjoy hiking?',                options: [{ label: 'No', tag: 'accessible' }, { label: 'Short hikes', tag: 'easy' }, { label: 'Yes', tag: 'mountain' }, { label: 'Long hikes', tag: 'adventure' }] },
  { id: '18', question: 'Do you like wildlife?',               options: [{ label: 'Not really', tag: 'accessible' }, { label: 'Neutral', tag: 'easy' }, { label: 'Like it', tag: 'adventure' }, { label: 'Love it', tag: 'wild' }] },
  { id: '19', question: 'Photography level?',                  options: [{ label: 'Beginner', tag: 'accessible' }, { label: 'Casual', tag: 'easy' }, { label: 'Enthusiast', tag: 'mountain' }, { label: 'Advanced', tag: 'adventure' }] },
  { id: '20', question: 'Adventure level?',                    options: [{ label: 'None', tag: 'accessible' }, { label: 'Light', tag: 'easy' }, { label: 'Medium', tag: 'mountain' }, { label: 'High', tag: 'adventure' }] },
  { id: '21', question: 'Do you like remote places?',          options: [{ label: 'No', tag: 'accessible' }, { label: 'Sometimes', tag: 'easy' }, { label: 'Yes', tag: 'mountain' }, { label: 'Absolutely', tag: 'wild' }] },
  { id: '22', question: 'Energy level?',                       options: [{ label: 'Low', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'High', tag: 'adventure' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '23', question: 'Weather preference?',                 options: [{ label: 'Warm', tag: 'accessible' }, { label: 'Mild', tag: 'easy' }, { label: 'Cool', tag: 'mountain' }, { label: 'Any', tag: 'wild' }] },
  { id: '24', question: 'Time outdoors?',                      options: [{ label: 'Short', tag: 'accessible' }, { label: 'Few hours', tag: 'easy' }, { label: 'Half day', tag: 'mountain' }, { label: 'All day', tag: 'wild' }] },
  { id: '25', question: 'Comfort zone?',                       options: [{ label: 'Stay safe', tag: 'accessible' }, { label: 'Try new things', tag: 'easy' }, { label: 'Push limits', tag: 'adventure' }, { label: 'Break limits', tag: 'wild' }] },
  { id: '26', question: 'Nature level?',                       options: [{ label: 'Light', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'Deep', tag: 'mountain' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '27', question: 'Travel budget?',                      options: [{ label: 'Low', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'High', tag: 'mountain' }, { label: 'No limits', tag: 'wild' }] },
  { id: '28', question: 'Navigation tools?',                   options: [{ label: 'Always GPS', tag: 'accessible' }, { label: 'Often maps', tag: 'easy' }, { label: 'Trails only', tag: 'mountain' }, { label: 'No tools', tag: 'wild' }] },
  { id: '29', question: 'Where do you prefer to sleep?',       options: [{ label: 'Hotel', tag: 'easy' }, { label: 'Cabin', tag: 'accessible' }, { label: 'Tent', tag: 'adventure' }, { label: 'Anywhere', tag: 'wild' }] },
  { id: '30', question: 'Walking distance?',                   options: [{ label: 'Short', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'Long', tag: 'mountain' }, { label: 'Very long', tag: 'adventure' }] },
  { id: '31', question: 'Risk tolerance?',                     options: [{ label: 'Low', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'High', tag: 'adventure' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '32', question: 'Planning style?',                     options: [{ label: 'None', tag: 'accessible' }, { label: 'Basic', tag: 'easy' }, { label: 'Detailed', tag: 'mountain' }, { label: 'Hardcore', tag: 'wild' }] },
  { id: '33', question: 'Favorite waterfall type?',            options: [{ label: 'Famous', tag: 'easy' }, { label: 'Easy access', tag: 'accessible' }, { label: 'Tall and scenic', tag: 'mountain' }, { label: 'Hidden', tag: 'wild' }] },
  { id: '34', question: 'Social preference?',                  options: [{ label: 'Groups', tag: 'easy' }, { label: 'Small group', tag: 'accessible' }, { label: 'Few people', tag: 'mountain' }, { label: 'Alone', tag: 'wild' }] },
  { id: '35', question: 'Explore or relax?',                   options: [{ label: 'Relax', tag: 'accessible' }, { label: 'Balanced', tag: 'easy' }, { label: 'Explore', tag: 'mountain' }, { label: 'Extreme explore', tag: 'wild' }] },
  { id: '36', question: 'Favorite view?',                      options: [{ label: 'Close and simple', tag: 'accessible' }, { label: 'Balanced', tag: 'easy' }, { label: 'Scenic', tag: 'mountain' }, { label: 'Wild nature', tag: 'wild' }] },
  { id: '37', question: 'Time flexibility?',                   options: [{ label: 'Limited', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'Flexible', tag: 'mountain' }, { label: 'Unlimited', tag: 'wild' }] },
  { id: '38', question: 'Navigation comfort?',                 options: [{ label: 'GPS only', tag: 'accessible' }, { label: 'Maps', tag: 'easy' }, { label: 'Trails', tag: 'mountain' }, { label: 'No guidance', tag: 'wild' }] },
  { id: '39', question: 'Photo goal?',                         options: [{ label: 'Memories', tag: 'easy' }, { label: 'Social media', tag: 'accessible' }, { label: 'Artistic', tag: 'mountain' }, { label: 'Professional', tag: 'adventure' }] },
  { id: '40', question: 'Travel vibe?',                        options: [{ label: 'Easy', tag: 'accessible' }, { label: 'Fun', tag: 'easy' }, { label: 'Scenic', tag: 'mountain' }, { label: 'Wild', tag: 'wild' }] },
  { id: '41', question: 'Walking difficulty?',                 options: [{ label: 'Easy', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'Hard', tag: 'mountain' }, { label: 'Extreme', tag: 'adventure' }] },
  { id: '42', question: 'Outdoor experience?',                 options: [{ label: 'None', tag: 'accessible' }, { label: 'Basic', tag: 'easy' }, { label: 'Good', tag: 'mountain' }, { label: 'Expert', tag: 'wild' }] },
  { id: '43', question: 'Nature interest?',                    options: [{ label: 'Low', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'High', tag: 'mountain' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '44', question: 'Travel goal?',                        options: [{ label: 'Relax', tag: 'accessible' }, { label: 'Explore', tag: 'easy' }, { label: 'Challenge', tag: 'adventure' }, { label: 'Discover', tag: 'wild' }] },
  { id: '45', question: 'Wildlife interest?',                  options: [{ label: 'Low', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'High', tag: 'adventure' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '46', question: 'Trip planning?',                      options: [{ label: 'None', tag: 'accessible' }, { label: 'Light', tag: 'easy' }, { label: 'Medium', tag: 'mountain' }, { label: 'Heavy', tag: 'wild' }] },
  { id: '47', question: 'Time commitment?',                    options: [{ label: 'Short', tag: 'accessible' }, { label: 'Medium', tag: 'easy' }, { label: 'Long', tag: 'mountain' }, { label: 'Full', tag: 'wild' }] },
  { id: '48', question: 'Comfort vs adventure?',               options: [{ label: 'Comfort', tag: 'accessible' }, { label: 'Balanced', tag: 'easy' }, { label: 'Adventure', tag: 'adventure' }, { label: 'Extreme', tag: 'wild' }] },
  { id: '49', question: 'Crowd tolerance?',                    options: [{ label: 'High', tag: 'easy' }, { label: 'Medium', tag: 'accessible' }, { label: 'Low', tag: 'mountain' }, { label: 'None', tag: 'wild' }] },
  { id: '50', question: 'Ideal trip?',                         options: [{ label: 'Easy', tag: 'accessible' }, { label: 'Scenic', tag: 'mountain' }, { label: 'Active', tag: 'adventure' }, { label: 'Wild', tag: 'wild' }] },
];