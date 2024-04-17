import InlineEditor from "./InlineEditor";

export default {
  title: 'Supercode/InlineEditor',
  component: InlineEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const dummyText = `
<p>Dear John,</p>
<p>This is an open letter to John Doe. So Picture this: you, yes, YOU, have become the unwitting superstar of the developer world. Your name is spreading faster than gossip at a family reunion. But here's the kicker&mdash;you're not involved! Nope, nada, zilch. It's like your name decided to ditch you for a more exciting life in coding.</p>
<p>Now, before you start imagining yourself as the next Elon Musk of programming, let me give you the scoop. Developers from all corners of the globe are using your name in their code as placeholders, variables, or test data. It's like they've formed a secret society where the password is... well, your name.</p>
<p>Think about it: somewhere out there, there's a developer typing away at their keyboard, probably sipping on a lukewarm cup of coffee, and suddenly, your name pops up on their screen. They chuckle, thinking they're oh-so-clever, while you're probably just wondering what on earth is going on.</p>
<p>So, here's the deal: you're now officially a coding legend. Congrats! If you ever decide to switch careers and become a developer, you've got a head start. But until then, just know that your name is making waves in the most unexpected places.</p>
<p>Stay awesome, John Doe, and remember, if you ever need a crash course in coding, you know who to call.</p>
<p>Regards, <br>AI that is going to take all the jobs.</p>
`
export const SupercodePlugin = {
  args: {
    skin: 'oxide',
    value: dummyText
  },
  argTypes: {
    skin: {
      options: ['oxide', 'oxide-dark'],
      control: { type: 'select' }
    }
  }
};