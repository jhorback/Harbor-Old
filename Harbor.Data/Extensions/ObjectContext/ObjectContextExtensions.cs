using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Objects;
using System.Data.Objects.DataClasses;
using System.Linq;
using System.Text;

namespace Harbor.Data.Extensions
{
	public static partial class ObjectContextExtensions
	{
		/// <summary>
		/// Attach an EntityObject that was modified when detached
		/// </summary>
		/// <param name="obj"></param>
		/// <param name="objectDetached">DetachedObject</param>
		public static void AttachUpdated(this ObjectContext obj, EntityObject objectDetached)
		{
			if (objectDetached.EntityState == EntityState.Detached)
			{
				object original = null;
				if (obj.TryGetObjectByKey(objectDetached.EntityKey, out original))
					obj.ApplyPropertyChanges(objectDetached.EntityKey.EntitySetName, objectDetached);
				else
					throw new ObjectNotFoundException();
			}
		}
	}
}
