import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from "react";

interface transactionTypeProps {
  transactionType: string | null;
  setTransactionType: (value: string | null) => void
}


export function TransactionTypeField({transactionType, setTransactionType}: transactionTypeProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleOptionChange = (
    event: React.MouseEvent<HTMLElement>,  
    newOption: string | null,
    ) => {
    setSelectedType(newOption)
    setTransactionType(newOption);
  };

  return (
    <div>
        <ToggleButtonGroup
            value={selectedType}
            exclusive
            onChange={handleOptionChange}
            aria-label="Transaction Type"
            color="primary"
            >
            <ToggleButton 
                value="Sale" 
                aria-label="Sale"
            >
                Sale
            </ToggleButton>
            <ToggleButton 
                value="Rental" 
                aria-label="Rental"
            >
                Rental
            </ToggleButton>
        </ToggleButtonGroup>
    </div>
  )
}
