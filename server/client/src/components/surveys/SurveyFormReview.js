import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { submitSurvey } from '../../actions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
      <button onClick={() => submitSurvey(formValues, history)} className="green  white-text btn-flat right">
        Confirm
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStateToProps, { submitSurvey })(withRouter(SurveyFormReview));