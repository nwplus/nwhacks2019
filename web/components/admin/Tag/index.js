import React from 'react';
import PropTypes from 'prop-types';
import { randomColor } from 'randomcolor';
import deleteIcon from '../../../assets/tag/delete-icon.svg';

// generates a text color and unique background color for a tag
const generateTagColor = (tagName) => {
  const backgroundColor = randomColor({ seed: tagName, luminosity: 'dark' });
  const textColor = '#FFFFFF';
  return {
    backgroundColor,
    color: textColor,
  };
};

const Tag = ({ tagName, deleteTag, allowDelete }) => {
  const tagColor = generateTagColor(tagName);
  return (
    <div className="tag-label" style={tagColor}>
      <div className="tag-name">
        {tagName}
      </div>
      {allowDelete
        ? (
          <div onClick={() => deleteTag(tagName)}>
            <img
              className="clickable margin-left-xs"
              alt="X"
              src={deleteIcon}
            />
          </div>
        ) : null
      }
    </div>
  );
};

Tag.propTypes = {
  // name of tag
  tagName: PropTypes.string.isRequired,
  // delete tag handler
  deleteTag: PropTypes.func,
  // allow deletion of tags
  allowDelete: PropTypes.bool,
};

export default Tag;
