
namespace Harbor.Domain.Security
{
	/// <summary>
    /// A tuple for indicating permissions for a functional area.
    /// </summary>
    public abstract class FunctionalPermissions<TFunctionalArea>
    {
        #region ctor
        public FunctionalPermissions(TFunctionalArea functionalArea, Permissions permissions)
        {
            this.FunctionalArea = functionalArea;
            this.Permissions = permissions;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Gets the functional area.
        /// </summary>
        public TFunctionalArea FunctionalArea { get; private set; }

        /// <summary>
        /// Gets the permissions.
        /// </summary>
        public Permissions Permissions { get; private set; }
        #endregion
    }
}
