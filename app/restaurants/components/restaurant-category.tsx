interface RestaurantCategoryProps {
  children: React.ReactNode;
}

const RestaurantCategory = ({ children }: RestaurantCategoryProps) => {
  return (
    <div className="mt-4 w-40 rounded-sm bg-background py-1 text-center text-xs text-muted-foreground">
      {children}
    </div>
  );
};

export default RestaurantCategory;
