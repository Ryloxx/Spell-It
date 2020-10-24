const speecher = window.speechSynthesis;
export default function speech(message) {
  if (typeof message !== 'string' || !message.trim()) {
    return;
  }
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-US';
  speecher.cancel();
  speecher.speak(utterance);
}
