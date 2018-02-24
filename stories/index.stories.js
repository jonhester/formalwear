import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withInfo } from '@storybook/addon-info';

import { Button, Welcome } from "@storybook/react/demo";
import Field from "../src/Field";
import Form from "../src/Form";

storiesOf('Component', module)
  .add('simple info',
  withInfo()(() =>
  <Form
    data={{ name: "Jon", lname: "Hester" }}
    onChange={action('form changed')}
    onUpdate={action('form updated')}
  >
    <Field name="name" required component="input" />
    <Field name="lname" validate={({ value }) => value === "Larry"} />

  </Form>
));
