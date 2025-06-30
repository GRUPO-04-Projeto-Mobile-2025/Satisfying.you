import { PropTypes } from 'prop-types';

export const acoesPesquisaPropTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      surveyTitle: PropTypes.string.isRequired,
      surveyId: PropTypes.string
    }).isRequired
  }).isRequired
};

export const agradecimentoPropTypes = {
  navigation: PropTypes.object.isRequired
};