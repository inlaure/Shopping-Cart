import { useEffect, useCallback, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const getMeals = useCallback(async function () {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://meals-ed7dc-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        setError(true);
        throw new Error(`Something went wrong.`);
      }

      let loadedMeals = [];
      const data = await response.json();

      for (const key in data) {
        loadedMeals.push({ id: key, ...data[key] });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
      setError(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getMeals();
  }, [getMeals]);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) {
    return <section className={classes.spinner}></section>;
  }

  if (error) {
    return <section className={classes['meals-error']}>{error}</section>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
