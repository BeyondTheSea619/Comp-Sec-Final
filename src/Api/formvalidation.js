const { body, validationResult } = require("express-validator");

app.post(
  "/user",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isStrongPassword()
      .withMessage(
        "Your password must contain 1 of the following: lowercase , uppercase, number, and symbol. It also must be at least 8 characters long.",
      ),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process valid data
  },
);
