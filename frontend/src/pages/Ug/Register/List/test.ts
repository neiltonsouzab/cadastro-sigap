import styled from 'styled-components';

import Select from '@material-ui/core/Select';

interface Ug {
  name: string;
}

export const ProvidersList = styled(Select as new () => Select<Ug>)`
  padding: 32px 24px 16px;
`;
