
namespace Harbor.Domain.Security
{
	/// <summary>
    /// A tuple for indicating permissions for a feature.
    /// </summary>
    public abstract class FeaturePermissions<TFeature>
    {
        #region ctor
        public FeaturePermissions(TFeature feature, Permissions permissions)
        {
            this.Feature = feature;
            this.Permissions = permissions;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Gets the feature.
        /// </summary>
        public TFeature Feature { get; private set; }

        /// <summary>
        /// Gets the permissions.
        /// </summary>
        public Permissions Permissions { get; private set; }
        #endregion
    }
}
