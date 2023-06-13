import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface ReviewChipProps {
    transactionType?: string | undefined
    propertyType?: string | undefined
    transactionCompleted?: boolean | undefined
}

export function ReviewChip({transactionType, propertyType, transactionCompleted}: ReviewChipProps) {

  const chips = [transactionType, propertyType, transactionCompleted].map((e) => {
    switch (e){
        case transactionType:
            if(typeof(transactionType) !== "undefined"){
                return (
                    <Chip 
                        label={transactionType}
                        color="primary"
                        size="small"
                    />
                )
            }
            return null
        case propertyType:
            if(typeof(transactionType) !== "undefined"){
                return (
                    <Chip 
                        label={propertyType}
                        color="success"
                        size="small"
                    />
                )
            }
            return null
        case transactionCompleted:
            if(typeof(transactionCompleted) !== "undefined"){
                if(transactionCompleted === true){
                    return(
                        <Chip 
                            label="Transacted"
                            color="warning"
                            size="small"
                        />
                    )
                }
                else if(transactionCompleted === false){
                    return(
                        <Chip 
                            label="Not transacted"
                            color="warning"
                            size="small"
                        />
                    )
                }
            }
            return null
    }
  })


  return (
    <Stack direction="row" spacing={1}>
      {chips}
    </Stack>
  );
}