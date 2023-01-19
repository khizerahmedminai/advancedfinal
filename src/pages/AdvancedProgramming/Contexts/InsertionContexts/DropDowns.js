import React from 'react';

export default function DropDowns(x) {
  const DropDown = {    
    PayType: ['Cash', 'Installments', 'By plan', 'Credit'],
    RentDuration: ['1 Month', '2 Months', '3 Months', '4 Months', '5 Months', '6 Months', '7 Months', '8 Months', '9 Months', '10 Months', '11 Months', '12 Months', 'Custom'],
    NewState: ['New', 'Renew'],
};
  return DropDown[x]
}
