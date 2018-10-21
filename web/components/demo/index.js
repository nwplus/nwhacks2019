import React from 'react';

import { SecondaryButton, PrimaryButton, ProgressGroup } from '../input/buttons';

import { Checkbox, CheckboxGroup } from '../input/buttons/CheckboxGroup';
import { RadioButton, RadioGroup } from '../input/buttons/RadioGroup';
import { TextInput, PasswordInput, TextArea } from '../input/text';
import { ShowHideTextView } from '../view';
import { Select } from '../input/select';

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
      <div id="demo" className="pad-nav">
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
        </CheckboxGroup>
        <Checkbox label="Ungrouped Checkbox" value="value3" name="new_checkbox_name_2" />
        <RadioGroup name="test_radio_group" className="dir-col">
          <RadioButton label="Label 1" value="value1" selected />
          <RadioButton label="Label 2" value="value2" disabled />
          <RadioButton label="Label 3" value="value3" />
        </RadioGroup>
        <br />
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
          name="some_text_input"
        />
        <TextInput
          placeholder="Hint text"
          onBlur={this.onBlur}
          onChange={this.onTextInputChange}
          label="Errored"
          value={textValue}
          error={error}
          name="some_errored_text_input"
        />
        <PasswordInput
          placeholder="Hint text"
          onChange={this.onPasswordChange}
          label="Password"
          value={password}
          name="some_password_text_input"
        />
        <TextInput
          placeholder="Hint text"
          label="Disabled"
          disabled
          name="some_disabled_text_input"
        />
        <br />
        <TextArea
          label="Enter some long answer"
          name="some_text_area"
          maxLength={25}
          rows={7}
          cols={60}
        />
        <br />
        <TextArea
          label="This has a character limit but you can't see it until it's too late"
          name="some_text_area"
          maxLength={25}
          showCharCount={false}
          rows={7}
          cols={60}
        />
        <br />
        <Select
          name="some_select"
          options={['University of Toronto', 'McGill University', 'University of Waterloo', 'University of Alberta', 'University of Manitoba', 'University of Saskatchewan', 'University of New Brunswick', 'Memorial University of Newfoundland', 'Dalhousie University']}
          label="Regular drop-down input"
        /><br /><br />
        <Select
          name="some_select"
          options={['University of Toronto', 'McGill University', 'University of Waterloo', 'University of Alberta', 'University of Manitoba', 'University of Saskatchewan', 'University of New Brunswick', 'Memorial University of Newfoundland', 'Dalhousie University']}
          label="Searchable drop-down input"
          placeholder="Start typing to search"
          isSearchable
        /><br /><br />
        <Select
          name="some_select"
          onChange={(props) => { console.log(props); }}
          options={['University of Toronto', 'McGill University', 'University of Waterloo', 'University of Alberta', 'University of Manitoba', 'University of Saskatchewan', 'University of New Brunswick', 'Memorial University of Newfoundland', 'Dalhousie University']}
          label="Searchable drop-down input that allows new options"
          formatNewOptionLabel={label => `My school is not listed, use "${label}"`}
          placeholder="Start typing to search"
          isSearchable
          allowNewOption
        /><br /><br />
        <p>Show/Hide Component</p>
        <br />
        <ShowHideTextView label="Don't click me" dropDownText="Wow I can't believe you actually did that" />
        <br />
        <ShowHideTextView label="Here's one with a whole lot of text so that you can see what this looks like with more than one line of text" dropDownText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum" />
      </div>
    );
  }
}

export default FrontEndComponents;
