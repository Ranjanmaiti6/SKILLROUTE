export function validateReportForm(formData, type = "LOST") {
  const errors = {};

  if (!formData.title || formData.title.trim().length < 3) {
    errors.title = "Please enter a descriptive item name (e.g., Black Casio Scientific Calculator).";
  }

  if (!formData.category || formData.category === "All Categories") {
    errors.category = "Please select a category.";
  }

  if (!formData.location || formData.location === "All Locations") {
    errors.location = "Please select where this item was lost or found.";
  }

  if (!formData.description || formData.description.trim().length < 10) {
    errors.description = "Please provide a short description (at least 10 characters) to help identify it.";
  }

  if (!formData.date) {
    errors.date = "Please specify the approximate date.";
  }

  if (type === "FOUND") {
    if (!formData.verificationQuestion || formData.verificationQuestion.trim().length < 5) {
      errors.verificationQuestion = "Please provide a private verification question only the real owner can answer.";
    }
    if (!formData.verificationAnswer || formData.verificationAnswer.trim().length < 2) {
      errors.verificationAnswer = "Please provide the private answer.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
