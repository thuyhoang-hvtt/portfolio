import React from 'react';

interface IProps {
  condition: boolean;
  caseTrue: React.ReactElement;
  caseFalse?: React.ReactElement;
}

function ConditionalRenderer({ condition, caseTrue, caseFalse }: IProps) {
  return condition ? caseTrue : caseFalse;
}

export default ConditionalRenderer;
