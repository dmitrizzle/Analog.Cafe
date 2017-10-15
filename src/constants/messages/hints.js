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
    title: "More Exposure?",
    text:
      "If you choose “Yes,” we may suggest other authors to feature your images (from this submission) within their articles. You will be credited every time.",
    buttons: [
      {
        to: "/submit/confirm-full-consent",
        text: "Yes",
        red: true
      },
      {
        to: "/submit/confirm-basic-consent",
        text: "No"
      }
    ]
  },
  id: "hints/submit-consent"
}
export const MESSAGE_HINT_IMAGE_SUGGESTIONS = {
  info: {
    title: "Image Suggestions",
    text:
      "You can freely use these hand-picked film photographs by the editor within your submission. A credit to the original photographer will be added automatically. Of course you can still upload your own images!"
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
