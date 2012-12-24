using System;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Linq;
using System.Web.Mvc.Html;

namespace Harbor.UI.Extensions
{
	public static partial class HtmlHelperExtensions
	{
		/// <summary>
		/// Use for simple properties to bind both a server and client side dto.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <typeparam name="TProperty"></typeparam>
		/// <param name="helper"></param>
		/// <param name="expression"></param>
		/// <param name="defaultValue"></param>
		/// <returns></returns>
		public static MvcHtmlString JstPropFor<TModel, TProperty>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression, object defaultValue = null)
		{
			string html = "";
			string propName = "";
			object propValue = defaultValue;

			//if (helper.IsJst())
			//{
				// get the property name
				var body = expression.Body;
				if (body.NodeType == ExpressionType.Convert)
					body = ((UnaryExpression) body).Operand;
				
				if ((body as MemberExpression) != null)
					propName = (body as MemberExpression).Member.Name;
			//}
			//else
			//{
				// get the property value
				var metaData = helper.ViewContext.ViewData.ModelMetadata;
				if (metaData != null)
					propValue = expression.Compile().Invoke((TModel)metaData.Model);
				
				if (propValue == null)
					propValue = "";
			//}

			html = string.Format(@"<span data-bind=""{0}"">{1}</span>", propName, propValue);
			return new MvcHtmlString(html);
		}
	}
}