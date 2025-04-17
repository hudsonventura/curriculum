export const Statistics = ({repos, followers,nugetLibs}) => {
  interface statsProps {
    quantity: string;
    description: string;
  }

    console.log(nugetLibs)
  const stats: statsProps[] = [
    {
      quantity: isNaN(repos?.length) ? 0 : repos?.length || 0,
      description: "Públic Respositories",
    },
    {
      quantity: isNaN(followers?.length) ? 0 : followers?.length || 0,
      description: "Subscribers",
    },
    {
      quantity: nugetLibs && nugetLibs.data && nugetLibs.data.length > 0
        ? isNaN(nugetLibs.data[0].totalDownloads)
          ? 0
          : nugetLibs.data[0].totalDownloads
        : 0,
      description: "Nuget Downloads",
    },
    {
      quantity: "4",
      description: "Pypi Downloads",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
