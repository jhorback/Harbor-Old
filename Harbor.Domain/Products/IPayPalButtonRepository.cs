using Harbor.Domain.Products;

namespace Harbor.Domain.Products
{
	public interface IPayPalButtonRepository : IRepository<PayPalButton>
	{
		PayPalButton FindById(int id, bool readOnly);
	}
}
