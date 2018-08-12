import React from 'react';

import { SecondaryButton, PrimaryButton, ProgressGroup } from '../input/buttons';

import { Checkbox, CheckboxGroup } from '../input/buttons/CheckboxGroup';
import { RadioButton, RadioGroup } from '../input/buttons/RadioGroup';
import { TextInput, PasswordInput } from '../input/text';

const ButtonCallback = e => console.log(`${e.currentTarget.textContent} button clicked!`);

class FrontEndComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 3,
      textValue: '',
      password: '',
    };
  }

  onTextInputChange = event => this.setState({ textValue: event.target.value });

  onPasswordChange = event => this.setState({ password: event.target.value });

  onBlur = e => console.log(e.target);

  switchProgress = index => this.setState({ active: index })

  render() {
    const error = {
      message: 'Something went wrong',
    };

    const { textValue, password } = this.state;

    const { active } = this.state;
    return (
      <div id="demo">
        <p>Buttons</p>
        <br />
        <div>
          <PrimaryButton text="Primary" onClick={ButtonCallback} />
          &nbsp;
          <SecondaryButton text="Secondary" onClick={ButtonCallback} />
        </div>
        <br />
        <div>
          <PrimaryButton text="Primary" onClick={ButtonCallback} disabled />
          &nbsp;
          <SecondaryButton text="Secondary" onClick={ButtonCallback} disabled />
        </div>
        <br />
        <CheckboxGroup name="test_checkbox_group">
          <Checkbox label="Label 1" value="value1" />
          <Checkbox label="Label 2" value="value2" disabled />
          <Checkbox label="Label 3" value="value3" name="new_checkbox_name_1" />
        </CheckboxGroup><br />
        <Checkbox label="Ungrouped Checkbox" value="value3" name="new_checkbox_name_2" />
        <br /><br />
        <RadioGroup name="test_radio_group" className="dir-col">
          <RadioButton label="Label 1" value="value1" selected />
          <RadioButton label="Label 2" value="value2" disabled />
          <RadioButton label="Label 3" value="value3" />
        </RadioGroup>
        <br /><br />
        <div>
          <ProgressGroup
            count={10}
            onClick={this.switchProgress}
            activeIndex={active}
            lastValidIndex={7}
          />
        </div>
        <TextInput
          placeholder="Hint text"
          onChange={this.onTextInputChange}
          onBlur={this.onBlur}
          label="Default"
          value={textValue}
          id="default"
        />
        <TextInput
          placeholder="Hint text"
          onBlur={this.onBlur}
          onChange={this.onTextInputChange}
          label="Errored"
          value={textValue}
          error={error}
          id="errored"
        />
        <PasswordInput
          placeholder="Hint text"
          onChange={this.onPasswordChange}
          label="Password"
          value={password}
          id="password"
        />
        <TextInput
          placeholder="Hint text"
          label="Disabled"
          disabled
          id="disabled"
        />
      </div>
    );
  }
}

export default FrontEndComponents;
