import React from 'react';
import PropTypes from 'prop-types';
import deleteIconLight from '../../../assets/tag/delete-icon-light.svg';
import deleteIconDark from '../../../assets/tag/delete-icon-dark.svg';

// generates a unique background color and text color for a tag
// based on https://stackoverflow.com/a/16348977/5179469
const generateTagColor = (tagName) => {
  let hash = 0;
  for (let i = 0; i < tagName.length; i += 1) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }
  let backgroundColor = '';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xFF;
    backgroundColor += ('00' + value.toString(16)).substr(-2);
  }
  const textColor = backgroundColor < '888888' ? 'FFFFFF' : '000000';
  return {
    backgroundColor: '#' + backgroundColor,
    color: '#' + textColor,
  };
};

// returns the correct delete icon (light or dark) given tagColor
const getDeleteIcon = (tagColor) => {
  if (tagColor.color === '#000000') {
    return deleteIconDark;
  }
  return deleteIconLight;
};

const Tag = ({ tagName, deleteTag, allowDelete }) => {
  const tagColor = generateTagColor(tagName);
  return (
    <div className="tag" style={tagColor}>
      <div className="tag-name">
        {tagName}
      </div>
      {allowDelete
        ? (
          <div onClick={() => deleteTag(tagName)}>
            <img
              className="clickable margin-left-xs"
              alt="X"
              src={getDeleteIcon(tagColor)}
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
