import React from 'react';
import './directory.styles.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selector';
import MenuItem from '../menu-item/menu-item.component';

const Directory = ({ sections, history }) => (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherSectionProps }) =>
      <MenuItem onClick={() => history.push(`/${otherSectionProps.linkUrl}`)} key={id} {...otherSectionProps} />
    )}
  </div>
)


const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default withRouter(connect(mapStateToProps)(Directory));