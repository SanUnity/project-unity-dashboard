import React from 'react';
import RadioAge from './radioAge/RadioAge';

const AgeList = ({ data, handleAgeSelect, showSimptoms }) => {
  return (
    <div>
      <span className="mx-3 mb-3 d-block data-title text-left">Usuarios por edad</span>
      {data &&
        data.map(item => {
          const newName = item.range.split('-').map((n, index) => {
            if (n === 'total') return n;
            if (index === 0 && n === '*') n = 0;
            if (index === 1 && n === '*') return n = '...';
            if(index === 0) return Number(n).toString();
            return Number(n - 1).toString();
          });
          const name =
            newName[0] === 'total' ? newName : newName.join(' - ') + ' años';
          const withSimp = item["level-1"]

          return (
            <RadioAge
              name={name}
              key={item.range}
              title={item.range}
              total={item.cases}
              percentage={item.percentage}
              color={item.color}
              handleSelect={handleAgeSelect}
              showSimptoms={showSimptoms}
              withSimp={withSimp}
              isSelected={item.isActive}
            />
          );
        })}
    </div>
  );
};

export default AgeList;
