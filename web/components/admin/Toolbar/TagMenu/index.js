import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import update from 'immutability-helper';
import { SecondaryButton, Checkbox } from '../../../input/buttons';
import { TextInput } from '../../../input/text/TextInput';

class TagMenu extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.defaultState = {
      tagOptions: {},
      newTagName: '',
      isApplyingTags: false,
    };
    this.state = this.defaultState;
  }

  // when the user cancels adding/removing tags (by clicking out of the menu)
  onCancel = () => {
    const { hideTagMenu } = this.props;
    this.setState(this.defaultState);
    hideTagMenu();
  }

  // when tag menu is opened
  onOpen = () => {
    const { getTagMenuOptions } = this.props;
    getTagMenuOptions(tagOptions => this.setState({ tagOptions }));
    // this.setState({ tagOptions: getTagMenuOptions( });
  }

  // handler that's called when "Create New Tag" button is clicked
  onCreateNewTag = (newTagName) => {
    const { createNewTag } = this.props;
    const addedTag = createNewTag(newTagName);
    if (addedTag === null) {
      // eslint-disable-next-line no-alert
      window.alert('Invalid tag name!');
    } else {
      const newState = update(this.state, {
        tagOptions: {
          [addedTag]: {
            $set: {},
          },
        },
      });
      this.setState(newState);
    }
  }

  // when a checkbox is checked/unchecked
  onTagOptionChange = (tagName, isChecked) => {
    const tagOption = {};
    tagOption.isChecked = !isChecked;
    tagOption.isIndeterminate = false;
    const newState = update(this.state, {
      tagOptions: {
        [tagName]: {
          $set: tagOption,
        },
      },
    });
    this.setState(newState);
  }

  // when apply button is clicked
  onApplyTags = (tagOptions) => {
    const { isApplyingTags } = this.state;
    if (!isApplyingTags) {
      this.setState({
        isApplyingTags: true,
      }, () => {
        const { applyTags } = this.props;
        applyTags(tagOptions, this.onApplyTagsSuccess, this.onApplyTagsFail);
      });
    }
  }

  // when tags are successfully applied
  onApplyTagsSuccess = () => {
    const { hideTagMenu } = this.props;
    this.setState(this.defaultState);
    hideTagMenu();
  }

  // when tags fail to apply successfully
  onApplyTagsFail = () => {
    // eslint-disable-next-line no-alert
    window.alert('Failed to apply tags!');
    this.setState({ isApplyingTags: false });
  }

  render() {
    const { isOpen } = this.props;
    const { tagOptions, newTagName, isApplyingTags } = this.state;
    return (
      <Modal
        open={isOpen}
        onEntered={this.onOpen}
        onClose={this.onCancel}
        showCloseIcon={false}
        center
        classNames={{
          modal: 'tag-menu pad-sides-s pad-ends-s',
        }}>
        <h4>Tag as:</h4>
        <div className="flex ai-center">
          <TextInput
            name="tag-search"
            placeholder="Enter tag name"
            className="textbox"
            onChange={value => this.setState({ newTagName: value })}
            value={newTagName}
          />
          <SecondaryButton
            text="Create new tag"
            className="create-tag-button"
            onClick={() => this.onCreateNewTag(newTagName)}
          />
        </div>
        {Object.keys(tagOptions).length === 0
          ? <p className="no-tags-found text-center">No tags found</p>
          : null}
        <div className="tag-list">
          {Object.keys(tagOptions).map((tagName) => {
            const tagOption = tagOptions[tagName];
            if (tagOption == null) return null;
            const { isChecked, isIndeterminate } = tagOption;
            return (
              <div className="tag" key={tagName}>
                <Checkbox
                  value={tagName}
                  label={tagName}
                  checked={isChecked || false}
                  isIndeterminate={isIndeterminate || false}
                  onChange={() => this.onTagOptionChange(tagName, isChecked)}
                  isControlled
                />
              </div>
            );
          })}
        </div>
        <div
          className={`apply-button user-select-none ${isApplyingTags ? 'opacity-60' : 'clickable'}`}
          onClick={() => this.onApplyTags(tagOptions)}> {isApplyingTags ? 'Applying...' : 'Apply'}
        </div>
      </Modal>
    );
  }
}

TagMenu.defaultProps = {
  className: '',
};

TagMenu.propTypes = {
  // handler to create a new tag
  createNewTag: PropTypes.func,
  // handler to apply (add/remove) tags from an array of applicants
  applyTags: PropTypes.func,
  // whether or not the modal is open
  isOpen: PropTypes.bool,
  // handler for hiding tag menu
  hideTagMenu: PropTypes.func,
  // currently checked applicants
  checkedApplicantIds: PropTypes.object,
  // returns tag menu options
  getTagMenuOptions: PropTypes.func,
  // additional styles
  className: PropTypes.string,
};

export default TagMenu;
