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
      "If you choose “Yes” your images may appear in others’ published works on Analog.Cafe. You may also be featured in the “Collaborations” section. We’ll let you know once that happens.",
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
export const MESSAGE_HINT_IMAGE_COLLAB_FEATURES = {
  info: {
    title: "Instant Collaboration",
    text:
      "Creating together is easy! Simply select a photo below that fits your work. You and the photographer will share the credit and may be listed in the “Collaborations” section on Analog.Cafe."
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

export const MESSAGE_HINT_OVERWRITE_DRAFT = {
  info: {
    title: "Overwrite Warning",
    text:
      "Looks like you are currently editing another draft on this device. Do you want to overwrite it by editing this article instead? This can not be undone.",
    buttons: [
      {
        to: "/submit/compose",
        text: "See My Current Draft",
        red: true
      },
      {
        to: "#overwrite",
        text: "⚠️ Overwrite"
      }
    ]
  },
  requested: { url: "hints/text-in-compsoer" }
}
