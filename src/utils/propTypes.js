import {PropTypes} from 'prop-types';

export const acoesPesquisaPropTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      pesquisa: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export const agradecimentoPropTypes = {
  navigation: PropTypes.object.isRequired,
};
