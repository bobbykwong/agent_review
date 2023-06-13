import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from "react";

interface transactionCompletedProps {
  transactionCompleted: boolean | null;
  setTransactionCompleted: (value: boolean | null) => void
}


export function TransactionCompletedField({transactionCompleted, setTransactionCompleted}: transactionCompletedProps) {
  const [selectedType, setSelectedType] = useState<boolean | null>(null)

  const handleOptionChange = (
    event: React.MouseEvent<HTMLElement>,  
    newOption: boolean | null,
    ) => {
    setSelectedType(newOption)
    setTransactionCompleted(newOption);
  };

  return (
    <div>
        <ToggleButtonGroup
            value={selectedType}
            exclusive
            onChange={handleOptionChange}
            aria-label="Transaction Completed"
            color="primary"
            >
            <ToggleButton 
                value={true} 
                aria-label="Yes"
            >
                Yes
            </ToggleButton>
            <ToggleButton 
                value={false} 
                aria-label="No"
            >
                No
            </ToggleButton>
        </ToggleButtonGroup>
    </div>
  )
}
