import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  isSave: Yup.boolean(),
  id: Yup.string(),
  createdAt: Yup.string().when("isSave", {
    is: true,
    then: Yup.string().required("Date required"),
  }),
  paymentDue: Yup.string(),
  description: Yup.string().when("isSave", {
    is: true,
    then: Yup.string().required("Description required"),
  }),
  paymentTerms: Yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .nullable(true)
    .when("isSave", {
      is: true,
      then: Yup.number()
        .transform((value) => (isNaN(value) ? null : value))
        .nullable(true)
        .required("Payment terms required"),
    }),
  clientName: Yup.string().when("isSave", {
    is: true,
    then: Yup.string().required("Client name required"),
  }),
  clientEmail: Yup.string().when("isSave", {
    is: true,
    then: Yup.string().email("Email invalid").required("Email required"),
  }),
  status: Yup.string(),
  senderAddress: Yup.object().shape({
    street: Yup.string().test(
      "isSave",
      "Street required",
      function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave ? Yup.string().required().isValidSync(value) : true;
      }
    ),
    city: Yup.string().test(
      "isSave",
      "City required",
      function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave ? Yup.string().required().isValidSync(value) : true;
      }
    ),
    postCode: Yup.number()
      .positive("Must be a positive number")
      .transform((value) => (isNaN(value) ? null : value))
      .nullable(true)
      .test("isSave", "Post code required", function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave
          ? Yup.number()
              .positive("Must be a positive number")
              .transform((value) => (isNaN(value) ? null : value))
              .nullable(true)
              .required()
              .isValidSync(value)
          : true;
      })
      .test("len", "Must be exactly 5 characters", (val) => {
        return !val
          ? Yup.number().transform((value) => (isNaN(value) ? null : value))
          : val?.toString().length === 5;
      }),
    country: Yup.string().test(
      "isSave",
      "Country required",
      function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave ? Yup.string().required().isValidSync(value) : true;
      }
    ),
  }),
  clientAddress: Yup.object().shape({
    street: Yup.string().test(
      "isSave",
      "Street required",
      function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave ? Yup.string().required().isValidSync(value) : true;
      }
    ),
    city: Yup.string().test(
      "isSave",
      "City required",
      function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave ? Yup.string().required().isValidSync(value) : true;
      }
    ),
    postCode: Yup.number()
      .positive("Must be a positive number")
      .transform((value) => (isNaN(value) ? null : value))
      .nullable(true)
      .test("isSave", "Post code required", function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave
          ? Yup.number()
              .positive("Must be a positive number")
              .transform((value) => (isNaN(value) ? null : value))
              .nullable(true)
              .required()
              .isValidSync(value)
          : true;
      })
      .test("len", "Must be exactly 5 characters", (val) => {
        return !val
          ? Yup.number().transform((value) => (isNaN(value) ? null : value))
          : val?.toString().length === 5;
      }),
    country: Yup.string().test(
      "isSave",
      "Country required",
      function (value, context) {
        const { isSave } = context.options.from[1].value;
        return isSave ? Yup.string().required().isValidSync(value) : true;
      }
    ),
  }),
  items: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().test(
          "isSave",
          "Name required",
          function (value, context) {
            const { isSave } = context.options.from[1].value;
            return isSave ? Yup.string().required().isValidSync(value) : true;
          }
        ),
        quantity: Yup.number()
          .positive("Must be a positive number")
          .transform((value) => (isNaN(value) ? null : value))
          .nullable(true)
          .test("isSave", "Quantity required", function (value, context) {
            const { isSave } = context.options.from[1].value;
            return isSave
              ? Yup.number()
                  .positive("Must be a positive number")
                  .transform((value) => (isNaN(value) ? null : value))
                  .nullable(true)
                  .required()
                  .isValidSync(value)
              : true;
          }),
        price: Yup.number()
          .positive("Must be a positive number")
          .transform((value) => (isNaN(value) ? null : value))
          .nullable(true)
          .test("isSave", "Price required", function (value, context) {
            const { isSave } = context.options.from[1].value;
            return isSave
              ? Yup.number()
                  .transform((value) => (isNaN(value) ? null : value))
                  .nullable(true)
                  .required()
                  .isValidSync(value)
              : true;
          }),
        total: Yup.number()
          .transform((value) => (isNaN(value) ? null : value))
          .nullable(true),
      })
    )
    .when("isSave", {
      is: true,
      then: Yup.array()
        .of(
          Yup.object().shape({
            description: Yup.string().test(
              "isSave",
              "Name required",
              function (value, context) {
                const { isSave } = context.options.from[1].value;
                return isSave
                  ? Yup.string().required().isValidSync(value)
                  : true;
              }
            ),
            quantity: Yup.number()
              .positive("Must be a positive number")
              .transform((value) => (isNaN(value) ? null : value))
              .nullable(true)
              .test("isSave", "Quantity required", function (value, context) {
                const { isSave } = context.options.from[1].value;
                return isSave
                  ? Yup.number()
                      .positive("Must be a positive number")
                      .transform((value) => (isNaN(value) ? null : value))
                      .nullable(true)
                      .required()
                      .isValidSync(value)
                  : true;
              }),
            price: Yup.number()
              .positive("Must be a positive number")
              .transform((value) => (isNaN(value) ? null : value))
              .nullable(true)
              .test("isSave", "Price required", function (value, context) {
                const { isSave } = context.options.from[1].value;
                return isSave
                  ? Yup.number()
                      .transform((value) => (isNaN(value) ? null : value))
                      .nullable(true)
                      .required()
                      .isValidSync(value)
                  : true;
              }),
            total: Yup.number()
              .transform((value) => (isNaN(value) ? null : value))
              .nullable(true),
          })
        )
        .test({
          message: "Add items to invoice",
          test: (arr) => arr.length > 0,
        }),
    }),
  total: Yup.number()
    .transform((value) => (isNaN(value) ? null : value))
    .nullable(true),
});
