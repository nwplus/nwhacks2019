import React from 'react';

import { SecondaryButton, PrimaryButton, ProgressGroup } from '../input/buttons';
import { TextInput } from '../input/text';
import { Checkbox, CheckboxGroup } from '../input/buttons/CheckboxGroup';

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
      <div>
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
        <CheckboxGroup name="test_name">
          <Checkbox label="Label 1" value="value1" />
          <Checkbox label="Label 2" value="value2" />
          <Checkbox label="Label 3" value="value3" name="overriden_name"/>
        </CheckboxGroup><br />
        <Checkbox label="Ungrouped Checkbox" value="value3" name="overriden_name"/>
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
        <TextInput
          placeholder="Hint text"
          onBlur={this.onBlur}
          onChange={this.onPasswordChange}
          password
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
