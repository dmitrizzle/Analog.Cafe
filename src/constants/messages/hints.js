export const MESSAGE_HINT_CHECK_EMAIL = email => {
  return {
    info: {
      title: "Email Sign In",
      text: `Please check your ${email} inbox and click the link we just sent you.`
    },
    id: "hints/check-email"
  }
}
export const MESSAGE_HINT_SUBMIT_CONSENT = {
  info: {
    title: "Open for Collaborations?",
    text:
      "Creating beautiful things together is easy. If you choose “Yes” your images may appear in other photo essays, stories, articles on Analog.Cafe. You and the authors who feature your work will be credited and have links to your profiles. We take care of everything else.",
    buttons: [
      {
        to:
          process.env.NODE_ENV === "development"
            ? "/submit/confirm-full-consent"
            : "/beta/confirm-full-consent",
        text: "Yes",
        red: true
      },
      {
        to:
          process.env.NODE_ENV === "development"
            ? "/submit/confirm-basic-consent"
            : "/beta/confirm-basic-consent",
        text: "No"
      }
    ]
  },
  id: "hints/submit-consent"
}
export const MESSAGE_HINT_IMAGE_SUGGESTIONS = {
  info: {
    title: "Instant Collaboration",
    text:
      "Creating together is easy! Simply select a photograph below that fits your work. You and the photographer will be credited and have links to your profiles on each post."
  },
  id: "hints/image-suggestions"
}
export const MESSAGE_HINT_AUTO_SAVE = {
  info: {
    title: "Never Loose Your Work!",
    text:
      "Your text and images are saved automatically onto your device as you type. Even if you’re offline!"
  },
  id: "hints/auto-save"
}
export const MESSAGE_HINT_YOUR_PROFILE = {
  info: {
    title: "Your Profile",
    text:
      "You can create, view or update your profile after you send your submission."
  },
  id: "hints/your-profile"
}
