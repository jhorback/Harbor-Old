using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Harbor.Domain
{
	public interface IReflectionUtils
	{
		
	}

	public class ReflectionUtils
	{
		private delegate bool TypeCheckDelegate(Type param, Type type);

		/// <summary>
		/// Invoke a method on an Object.
		/// </summary>
		/// <param name="methodName">The method to invoke.</param>
		/// <param name="obj">The object containing the method.</param>
		/// <param name="parameters">Any method parameters</param>
		/// <returns>The return value from the method.</returns>
		public object InvokeMethod(object obj, string methodName, params object[] parameters)
		{
			return InternalInvokeMember(obj.GetType(), obj, methodName, BindingFlags.InvokeMethod, null, parameters);
		}

		/// <summary>
		/// Invoke a static method on an Object.
		/// </summary>
		/// <param name="methodName">The method to invoke.</param>
		/// <param name="type">The object type</param>
		/// <param name="parameters">An method parameters</param>
		/// <returns>The return value from the method.</returns>
		public object InvokeStaticMethod(Type type, string methodName, params object[] parameters)
		{
			return InternalInvokeMember(type, null, methodName, BindingFlags.InvokeMethod, null, parameters);
		}

		/// <summary>
		/// Invoke a method on an Object.
		/// </summary>
		/// <param name="methodName">The method to invoke.</param>
		/// <param name="obj">The object containing the method.</param>
		/// <param name="genericParameters">Generic parameter types.</param>
		/// <param name="parameters">Any method parameters</param>
		/// <returns>The return value from the method.</returns>
		public object InvokeMethod(object obj, string methodName, Type[] genericParameters, params object[] parameters)
		{
			return InternalInvokeMember(obj.GetType(), obj, methodName, BindingFlags.InvokeMethod, genericParameters, parameters);
		}

		/// <summary>
		/// Invoke a static method on an Object.
		/// </summary>
		/// <param name="methodName">The method to invoke.</param>
		/// <param name="type">The object type</param>
		/// <param name="genericParameters">genericParameters</param>
		/// <param name="parameters">Any method parameters</param>
		/// <returns>The return value from the method.</returns>
		public object InvokeStaticMethod(Type type, string methodName, Type[] genericParameters, params object[] parameters)
		{
			return InternalInvokeMember(type, null, methodName, BindingFlags.InvokeMethod, genericParameters, parameters);
		}

		/// <summary>
		/// Get the specified property from the Object.
		/// </summary>
		/// <param name="propertyName">The property to get.</param>
		/// <param name="obj">The object containing the property.</param>
		/// <returns>The property value.</returns>
		public object GetProperty(object obj, string propertyName)
		{
			return InternalInvokeMember(obj.GetType(), obj, propertyName, BindingFlags.GetProperty, null);
		}

		/// <summary>
		/// Get the specified static property from the type.
		/// </summary>
		/// <param name="propertyName">The property to get.</param>
		/// <param name="type">The type of the class.</param>
		/// <returns>The property value.</returns>
		public object GetStaticProperty(Type type, string propertyName)
		{
			BindingFlags flags = BindingFlags.GetProperty | BindingFlags.FlattenHierarchy
				| BindingFlags.Public | BindingFlags.Static;
			return InternalInvokeMember(type, null, propertyName, flags, null);
		}

		/// <summary>
		/// Set the specified property on the Object.
		/// </summary>
		/// <param name="propertyName">The property to set.</param>
		/// <param name="obj">The object containing the property.</param>
		/// <param name="parameters">The data used in setting the property.</param>
		public void SetProperty(object obj, string propertyName, params object[] parameters)
		{
			InternalInvokeMember(obj.GetType(), obj, propertyName, BindingFlags.SetProperty, null, parameters);
		}

		/// <summary>
		/// Set the specified property on the Object.
		/// </summary>
		/// <param name="propertyName">The property to set.</param>
		/// <param name="type">The type of the class.</param>
		/// <param name="parameters">The data used in setting the property.</param>
		public void SetStaticProperty(Type type, string propertyName, params object[] parameters)
		{
			InternalInvokeMember(type, null, propertyName, BindingFlags.SetProperty, null, parameters);
		}

		private T InternalGetField<T>(Type type, object instance, string fieldname)
		{
			BindingFlags flags = BindingFlags.GetField | BindingFlags.NonPublic | BindingFlags.Instance |
				BindingFlags.FlattenHierarchy | BindingFlags.Public | BindingFlags.Static;
			return (T)InternalInvokeMember(type, instance, fieldname, flags, null, null);
		}

		/// <summary>
		/// Gets the specified field on the class.
		/// </summary>
		/// <typeparam name="T">Type</typeparam>
		/// <param name="type">Type to get the static field.</param>
		/// <param name="fieldname">Field Name</param>
		/// <returns>Value of field specified.</returns>
		public T GetStaticField<T>(Type type, string fieldname)
		{
			return InternalGetField<T>(type, null, fieldname);
		}

		/// <summary>
		/// Gets the specified field on the instance.
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="instance"></param>
		/// <param name="fieldname"></param>
		/// <returns></returns>
		public T GetField<T>(object instance, string fieldname)
		{
			return InternalGetField<T>(instance.GetType(), instance, fieldname);
		}

		private void InternalSetField(Type type, object instance, string name, object value)
		{
			BindingFlags flags = BindingFlags.SetField | BindingFlags.NonPublic | BindingFlags.Instance |
				BindingFlags.FlattenHierarchy | BindingFlags.Public | BindingFlags.Static;
			InternalInvokeMember(type, instance, name, flags, null, new object[] { value });
		}

		/// <summary>
		/// Sets the specified field on the class.
		/// </summary>
		/// <param name="type">Type</param>
		/// <param name="fieldname">Name of field to set.</param>
		/// <param name="value">Value to set.</param>
		public void SetStaticField(Type type, string fieldname, object value)
		{
			InternalSetField(type, null, fieldname, value);
		}

		/// <summary>
		/// Sets the specified field on the object instance.
		/// </summary>
		/// <param name="instance">Instance.</param>
		/// <param name="fieldname">Name of field to set.</param>
		/// <param name="value">Value to set.</param>
		public void SetField(object instance, string fieldname, object value)
		{
			InternalSetField(instance.GetType(), instance, fieldname, value);
		}

		private object InternalInvokeMember(Type type, object obj, string memberName,
			BindingFlags flags, Type[] genericParameters, params object[] parameters)
		{
			// .NET FX does not check if an empty string and just returns null making
			// it impossible to distinguish between an error or successful call that
			// returns void or null.
			// ParameterUtils.CheckNullOrEmpty(memberName, "memberName");

			// TODO Change this so the behavior is the same between generic an no generic
			//	methods.  MethodInfo.Invoke() and type.InvokeMember() act differently
			//  when calling a method with variable arguments (params).  Make this change
			//  after unit tests are in place for all the InvokeXXX methods.
			object result = null;
			if (genericParameters != null && genericParameters.Length > 0)
			{
				var methodInfo = type.GetMethod(memberName);
				if (methodInfo != null)
				{
					var miBound = methodInfo.MakeGenericMethod(genericParameters);
					result = miBound.Invoke(obj, (parameters != null && parameters.Length > 0) ? parameters : null);
				}
			}
			else
			{
				result = type.InvokeMember(memberName, flags, null, obj,
					(parameters != null && parameters.Length > 0) ? parameters : null);
			}
			return result;
		}

		/// <summary>
		/// Binds generic paramters to a generic type returning a concrete type.
		/// </summary>
		/// <param name="type">Generic type</param>
		/// <param name="genericParameters">Generic parameter types</param>
		/// <returns>Returns the required concrete type, binding generic parameters if required.</returns>
		public Type GetGenericType(Type type, params Type[] genericParameters)
		{
			if (genericParameters != null && genericParameters.Length > 0)
			{
				type = type.GetGenericTypeDefinition().MakeGenericType(genericParameters);
			}
			else
			{
				if (type.ContainsGenericParameters)
				{
					throw new ArgumentNullException("genericParameters", "genericParameters cannot " +
						"be null for unbound generic types");
				}
			}
			return type;
		}

		/// <summary>
		/// Create an instance of the specified type.
		/// </summary>
		/// <typeparam name="T">Instance type to create and cast to.</typeparam>
		/// <param name="genericParameters">Generic parameter types.</param>
		/// <param name="args">Any constructor parameters.</param>
		/// <returns>The new object instance.</returns>
		public T CreateInstance<T>(Type[] genericParameters, params object[] args)
		{
			return (T)CreateInstance(GetGenericType(typeof(T), genericParameters), args);
		}

		/// <summary>
		/// Create an instance of the specified type.
		/// </summary>
		/// <param name="type">The type of the object to create.</param>
		/// <param name="genericParameters">genericParameters</param>
		/// <param name="args"></param>
		/// <returns>The new object instance.</returns>
		public object CreateInstance(Type type, Type[] genericParameters, params object[] args)
		{
			return CreateInstance(GetGenericType(type, genericParameters), args);
		}

		/// <summary>
		/// Create an instance of the specified type.
		/// </summary>
		/// <param name="type">The type of the object to create.</param>
		/// <param name="args"></param>
		/// <returns>The new object instance.</returns>
		public object CreateInstance(Type type, params object[] args)
		{
			BindingFlags flags = BindingFlags.Public | BindingFlags.NonPublic
				| BindingFlags.CreateInstance | BindingFlags.Instance;
			if (args != null && args.Length == 0)
			{
				args = null;
			}
			if (type.ContainsGenericParameters)
			{
				throw new ArgumentException("Cannot create instance of generic type with unbound generic parameters");
			}
			return Activator.CreateInstance(type, flags, null, args, null, null);
		}

		public IList<Type> FindTypesWithAttribute<T>()
		{
			var assembly = Assembly.GetExecutingAssembly();
			var types = from type in assembly.GetTypes()
				where Attribute.IsDefined(type, typeof(T))
				select type;
			return types.ToList();
		}

		public T GetAttribute<T>(Type type) where T : Attribute
		{
			var attrs = Attribute.GetCustomAttributes(type); 
			var matching = attrs.OfType<T>().Select(attr => attr).ToList();
			return matching[0];
		}



		/// <summary>
		/// Finds types, that implement a particular interface, in loaded assemblies.
		/// </summary>
		/// <param name="interfaceType">the interface to search for</param>
		/// <returns>List of types</returns>
		/// <remarks>
		/// This method only searches loaded assemblies in the application domain.
		/// It will not load assemblies to perform search.
		/// </remarks>
		public IList<Type> FindTypesImplementingInterface(Type interfaceType)
		{
			return FindTypesImplementingInterface(interfaceType, AppDomain.CurrentDomain.GetAssemblies());
		}

		/// <summary>
		/// Finds types, that implement a particular interface, in specified assemblies.
		/// </summary>
		/// <param name="interfaceType">the interface to search for</param>
		/// <param name="assemblies">the assemblies to search through</param>
		/// <returns>List of types, may be empty but never null.</returns>
		/// <remarks>
		/// This method only searches the specified assemblies.
		/// It will not load assemblies to perform search.
		/// </remarks>
		public IList<Type> FindTypesImplementingInterface(Type interfaceType, IList<Assembly> assemblies)
		{
			var array = new Assembly[assemblies.Count];
			assemblies.CopyTo(array, 0);
			return FindTypesImplementingInterface(interfaceType, array);
		}

		/// <summary>
		/// Finds types, that implement a particular interface, in specified assemblies.
		/// </summary>
		/// <param name="interfaceType">the interface to search for</param>
		/// <param name="assemblies">Assemblies to search through</param>
		/// <returns>List of types, may be empty but never null.</returns>
		/// <remarks>
		/// This method only searches the specified assemblies.
		/// It will not load assemblies to perform search.
		/// </remarks>
		public IList<Type> FindTypesImplementingInterface(Type interfaceType, params Assembly[] assemblies)
		{
			//interfaceType.CheckNull("interfaceType");
			if (!interfaceType.IsInterface)
			{
				throw new ArgumentException("interfaceType is not an interface");
			}
			return FindTypes(interfaceType, new TypeCheckDelegate(InterfaceTypeCheck), assemblies);
		}

		private bool InterfaceTypeCheck(Type interfaceType, Type type)
		{
			return interfaceType.IsAssignableFrom(type);
		}

		private IList<Type> FindTypes(Type type, TypeCheckDelegate typeCheck, IList<Assembly> assemblies)
		{
			//assemblies.CheckNull("assemblies");

			IList<Type> types = new List<Type>();
			foreach (Assembly assembly in assemblies)
			{
				if (assembly == null)
				{
					continue;
				}
				//_logger.DebugFormat("Loading types from {0}", assembly.FullName);
				foreach (Type assemblyType in assembly.GetTypes())
				{
					if (!assemblyType.IsAbstract && typeCheck(type, assemblyType))
					{
						types.Add(assemblyType);
					}
				}
			}
			return types;
		}

		/// <summary>
		/// Returns a list of types that are supplied to the generic interface.
		/// <![CDATA[
		///     With "myType" being an instance of an object that implements: ICommand<SomeCommand>
		///     GetTypeParameters(myType, typeof(ICommand<>)
		///     Returns: { typeof(SomeCommand) }
		/// ]]>
		/// </summary>
		/// <param name="type"></param>
		/// <param name="implementedInterface"></param>
		/// <returns></returns>
		public IEnumerable<Type> GetTypeParameters(Type type, Type implementedInterface)
		{
			return
				from interfaceType in type.GetInterfaces()
				where interfaceType.IsGenericType
				let baseInterface = interfaceType.GetGenericTypeDefinition()
				where baseInterface == implementedInterface
				select interfaceType.GetGenericArguments().FirstOrDefault();
		}
	}
}
